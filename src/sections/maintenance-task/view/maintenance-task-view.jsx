import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid } from '@mui/x-data-grid';
import { Card, Stack, Button, Container, Typography, TableContainer } from '@mui/material';

import { fDateTime, calculateEstimatedDuration } from 'src/utils/format-time';

import { openDialog } from 'src/features/dialogs/dialogsSlice';
import {
  fetchMaintenanceTasks,
  selectMaintenanceTasks,
  selectMaintenanceTaskStatus,
} from 'src/features/maintenance/maintenanceTaskSlice';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import LoadingSkeleton from 'src/components/loading-skeleton';

import MaintenanceTaskTableToolbar from './maintenance-task-table-toolbar';

// ----------------------------------------------------------------------

const columns = [
  {
    field: 'title',
    headerName: 'Título',
    width: 200,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'startDate',
    headerName: 'Fecha de Inicio',
    width: 200,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'estimatedDuration',
    headerName: 'Duración',
    width: 100,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'status',
    headerName: 'Estado',
    width: 80,
    headerAlign: 'center',
    align: 'center',
  },
//   {
//     field: 'completedDate',
//     headerName: 'Fecha de Completado',
//     width: 200,
//     headerAlign: 'center',
//     align: 'center',
//   },
  {
    field: 'nextMaintenanceTaskDate',
    headerName: 'Próximo Mantenimiento',
    width: 200,
    headerAlign: 'center',
    align: 'center',
  },
  // {
  //     field: 'actions', headerName: '', width: 40, align: 'right', renderCell: (params) => <MaintenanceActionMenu maintenanceId={params.row.id} />
  // },
];

export default function MaintenaceTaskView() {
  const dispatch = useDispatch();

  const tasks = useSelector(selectMaintenanceTasks);
  const status = useSelector(selectMaintenanceTaskStatus);
  const [startDate, setStartDate] = useState(new Date(new Date().getFullYear(), 0, 1));
  const [endDate, setEndDate] = useState(new Date(new Date().getFullYear(), 11, 31));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMaintenanceTasks());
    }
  }, [status, dispatch]);

  const handleFilterDates = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const taskStatus = {
    Pendiente: '⌚',
    Ejecutado: '✅',
    Cancelado: '❌',
  };

  const dataFiltered = tasks.filter((task) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const taskDate = new Date(task.startDate);
    return taskDate >= start && taskDate <= end;
  });

const tasksWithFormattedDates = dataFiltered.map((task) => {
    const estimatedDuration = calculateEstimatedDuration(task.startDate, task.endDate);
    return {
        ...task,
        status: taskStatus[task.status],
        startDate: fDateTime(task.startDate, 'dd/MM/yyyy HH:mm a'),
        estimatedDuration,
        completedDate: fDateTime(task.completedDate, 'dd/MM/yyyy HH:mm a'),
        nextMaintenanceTaskDate: fDateTime(task.nextMaintenanceTaskDate, 'dd/MM/yyyy HH:mm a'),
    };
});

  const notFound = !dataFiltered.length;

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h4">Tareas de Mantenimiento</Typography>
        {/* <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={() => dispatch(openDialog({ dialogType: 'createMaintenanceTask' }))}
                >
                    Nueva Tarea
                </Button> */}
      </Stack>

      <Card>
        <MaintenanceTaskTableToolbar onFilterDates={handleFilterDates} dates={{ startDate, endDate }} />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <div style={{ width: '100%' }}>
              <DataGrid
                rows={tasksWithFormattedDates}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 20]}
                checkboxSelection
                autoHeight
                columnHeaderHeight={90}
                rowHeight={70}
                // disableRowSelectionOnClick
                disableColumnMenu
                disableColumnSelector
                slots={{
                  loadingOverlay: LoadingSkeleton,
                }}
                loading={status === 'loading'}
                //   onRowSelectionModelChange={handleSelectionChange}
                sx={{
                  '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    color: '#697A87',
                  },
                  '& .MuiDataGrid-row': {
                    cursor: 'pointer',
                  },
                  '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus': {
                    outline: 'none',
                  },
                  '& .MuiDataGrid-cell': {
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 4px',
                  },
                }}
                getRowHeight={() => 'auto'}
              />
            </div>

            {notFound && (
              <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
                No se encontraron tareas de mantenimiento
              </Typography>
            )}
          </TableContainer>
        </Scrollbar>
      </Card>
    </Container>
  );
}
