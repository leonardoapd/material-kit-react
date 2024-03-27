/* eslint-disable unused-imports/no-unused-imports */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataGrid } from '@mui/x-data-grid';
import { Card, Stack, Button, Container, Typography, TableContainer } from '@mui/material';

import { openDialog } from 'src/features/dialogs/dialogsSlice';
import {
  fetchEmployees,
  selectEmployees,
  selectEmployeeStatus,
} from 'src/features/employee/employeeSlice';
import {
  fetchEquipment,
  selectEquipment,
  selectEquipmentStatus,
} from 'src/features/equipment/equipmentSlice';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import LoadingSkeleton from 'src/components/loading-skeleton';

import EquipmentActionMenu from '../equipment-action-menu';
import EquipmentTableToolbar from '../equipment-table-toolbar';
import AddEquipmentDialog from '../crud/add-equipment-form-dialog';
import EditEquipmentDialog from '../crud/edit-equipment-form-dialog';
import ShowEquipmentInfoDialog from '../crud/show-equipment-info-dialog';
import DeleteConfirmationDialog from '../crud/delete-confirmation-dialog';
import AddMaintenanceDialog from '../../maintenance/crud/add-maintenance-form-dialog';

// ----------------------------------------------------------------------

const columns = [
  { field: 'code', headerName: 'Código', width: 140 },
  { field: 'name', headerName: 'Equipo', width: 200 },
  { field: 'location', headerName: 'Ubicación', width: 100 },
  {
    field: 'purchaseDate',
    headerName: 'Fecha de Compra',
    width: 180,
    headerClassName: 'header-style',
  },
  { field: 'serialNumber', headerName: 'Serial', width: 140 },
  { field: 'model', headerName: 'Modelo', width: 140 },
  { field: 'category', headerName: 'Categoría', width: 160 },
  {
    field: 'accountableName',
    headerName: 'Responsable',
    width: 160,
  },
  {
    field: 'actions',
    headerName: '',
    width: 40,
    align: 'right',
    renderCell: (params) => <EquipmentActionMenu equipmentId={params.row.id} />,
  },
];

export default function EquipmentView() {
  const dispatch = useDispatch();
  const [filterName, setFilterName] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const inventory = useSelector(selectEquipment);
  const status = useSelector(selectEquipmentStatus);

  const employees = useSelector(selectEmployees);
  const employeeStatus = useSelector(selectEmployeeStatus);

  // ---------------------- Effects ---------------------- //

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEquipment());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (employeeStatus === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [employeeStatus, dispatch]);

  // ---------------------- Handlers ---------------------- //

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  // const handleOpenAddMaintenanceDialog = () => {
  //   dispatch(openDialog({ dialogType: 'addMaintenance' }));
  // };

  const handleOpenAddEquipmentDialog = () => {
    dispatch(openDialog({ dialogType: 'addEquipment' }));
  };

  // ---------------------- Helpers ---------------------- //

  const getAccountableName = (accountableId) => {
    const foundEmployee = employees.find((employee) => employee.id === accountableId);
    return foundEmployee ? foundEmployee.name : '';
  };

  const formatPurchaseDate = (purchaseDate) => {
    const normalDate = new Date(purchaseDate);
    return normalDate.toLocaleDateString('en-GB');
  };

  const rowsWithAccountableName = inventory.map((equipment) => ({
    ...equipment,
    accountableName: getAccountableName(equipment.accountableId),
    purchaseDate: formatPurchaseDate(equipment.purchaseDate),
  }));

  const dataFiltered = rowsWithAccountableName.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filterName.toLowerCase())
    )
  );

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Inventario</Typography>

        <Button
          variant="contained"
          color="success"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenAddEquipmentDialog}
        >
          Añadir Equipo
        </Button>
      </Stack>

      <Card>
        <EquipmentTableToolbar
          numSelected={selectedRows.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
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

      <AddEquipmentDialog />

      <AddMaintenanceDialog selected={selectedRows[0]} />

      <DeleteConfirmationDialog />

      <EditEquipmentDialog />

      <ShowEquipmentInfoDialog />
    </Container>
  );
}
