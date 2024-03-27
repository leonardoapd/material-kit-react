import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid } from '@mui/x-data-grid';
import { Card, Stack, Button, Container, Typography, TableContainer } from '@mui/material';

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

// ----------------------------------------------------------------------

const columns = [
  { field: 'type', headerName: 'Tipo', width: 140 },
  {
    field: 'equipmentName',
    headerName: 'Nombre del Equipo',
    width: 200,
  },
  { field: 'description', headerName: 'Descripción', width: 400 },
  {
    field: 'frequency',
    headerName: 'Frecuencia en Dias',
    width: 180,
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
  const [filterName, setFilterName] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const maintenances = useSelector(selectMaintenance);
  const status = useSelector(selectMaintenanceStatus);

  const equipment = useSelector(selectEquipment);
  const equipmentStatus = useSelector(selectEquipmentStatus);

  // ---------------------- Effects ---------------------- //

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

  // ---------------------- Helpers ---------------------- //

  const getEquipmentName = (equipmentId) => {
    const foundEquipment = equipment.find((eq) => eq.id === equipmentId);
    return foundEquipment ? foundEquipment.name : 'Equipo no encontrado';
  };

  const rowsWithEquipmentName = maintenances.map((maintenance) => ({
    ...maintenance,
    equipmentName: getEquipmentName(maintenance.equipmentId),
  }));

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
                rowHeight={60}
                disableRowSelectionOnClick
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
                }}
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
    </Container>
  );
}
