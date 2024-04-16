import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid } from '@mui/x-data-grid';
import { Card, Stack, Button, Container, Typography, TableContainer } from '@mui/material';

import { formatMaintenanceData } from 'src/utils/maintenance-utils';

import { openDialog } from 'src/features/dialogs/dialogsSlice';
import {
  fetchEquipment,
  selectEquipment,
  selectEquipmentStatus,
} from 'src/features/equipment/equipmentSlice';
import {
  fetchMaintenance,
  selectMaintenance,
  selectMaintenanceStatus,
} from 'src/features/maintenance/maintenanceSlice';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import LoadingSkeleton from 'src/components/loading-skeleton';

import MaintenanceActionMenu from '../maintenance-action-menu';
import MaintenanceTableToolbar from '../maintenance-table-toolbar';
import AddMaintenanceDialog from '../crud/add-maintenance-form-dialog';
import EditMaintenanceFormDialog from '../crud/edit-maintenance-form-dialog';
import ShowMaintenanceInfoDialog from '../crud/show-maintenance-info-dialog';
import DeleteConfirmationDialog from '../crud/delete-maintenance-confirmation-dialog';

// ----------------------------------------------------------------------

const columns = [
  { field: 'type', headerName: 'Tipo', width: 100 },
  {
    field: 'equipmentName',
    headerName: 'Equipo',
    width: 200,
    headerAlign: 'center',
    align: 'center',
  },
  // { field: 'description', headerName: 'Descripción', width: 260, headerAlign: 'center' },
  {
    field: 'cost',
    headerName: 'Costo Unitario',
    width: 120,
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
  {
    field: 'nextMaintenanceTaskDate',
    headerName: 'Próx. Mantenimiento',
    width: 220,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'frequency',
    headerName: 'Frecuencia',
    width: 120,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'actions',
    headerName: '',
    width: 40,
    align: 'right',
    renderCell: (params) => <MaintenanceActionMenu maintenanceId={params.row.id} />,
  },
];

export default function MaintenanceView() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [filterName, setFilterName] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const maintenances = useSelector(selectMaintenance);
  const status = useSelector(selectMaintenanceStatus);

  const equipment = useSelector(selectEquipment);
  const equipmentStatus = useSelector(selectEquipmentStatus);

  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');

  // ---------------------- Effects ---------------------- //

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('equipmentName') || '';
    setFilterName(search);
  }, [location.search]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMaintenance());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (equipmentStatus === 'idle') {
      dispatch(fetchEquipment());
    }
  }, [equipmentStatus, dispatch]);

  // ---------------------- Handlers ---------------------- //

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  const handleSchedule = () => {
    dispatch(openDialog({ dialogType: 'addMaintenance' }));
  };

  const handleShowInfo = () => {
    console.log(selectedRows);
    dispatch(openDialog({ dialogType: 'showMaintenanceInfo', data: selectedRows[0] }));
  };

  const handleFilterDates = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  // ---------------------- Helpers ---------------------- //

  const filteredMaintenances = maintenances.filter((maintenance) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const maintenanceDate = new Date(maintenance.startDate);
    return maintenanceDate >= start && maintenanceDate <= end;
  });

  const rowsWithEquipmentName = formatMaintenanceData(filteredMaintenances, equipment);

  const dataFiltered = rowsWithEquipmentName.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filterName.toLowerCase())
    )
  );

  const notFound = !dataFiltered.length && !!filterName;

  // ---------------------- Render ---------------------- //

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Mantenimientos</Typography>
        <Button
          variant="contained"
          color="success"
          onClick={handleSchedule}
          startIcon={<Iconify icon="ic:schedule" />}
        >
          Programar
        </Button>
      </Stack>

      <Card>
        <MaintenanceTableToolbar
          numSelected={selectedRows.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onFilterDates={handleFilterDates}
          dates={{ startDate, endDate }}
          onShowInfo={handleShowInfo}
        />
        <Scrollbar>
          <TableContainer>
            <div style={{ width: '100%' }}>
              <DataGrid
                rows={dataFiltered}
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
                onRowSelectionModelChange={handleSelectionChange}
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
                No se encontraron mantenimientos que coincidan con la búsqueda.
              </Typography>
            )}
          </TableContainer>
        </Scrollbar>
      </Card>

      <AddMaintenanceDialog />

      <DeleteConfirmationDialog />

      <EditMaintenanceFormDialog />

      <ShowMaintenanceInfoDialog />
    </Container>
  );
}
