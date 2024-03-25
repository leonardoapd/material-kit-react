/* eslint-disable unused-imports/no-unused-imports */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { openDialog } from 'src/features/dialogs/dialogsSlice';
// import { data } from 'src/_mock/inventory';
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

// import './equipment-view.css';
import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import EquipmentTableRow from '../equipment-table-row';
import EquipmentTableHead from '../equipment-table-head';
import EquipmentTableToolbar from '../equipment-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import AddEquipmentDialog from '../crud/add-equipment-form-dialog';
import EditEquipmentDialog from '../crud/edit-equipment-form-dialog';
import EquipmentTableRowSkeleton from '../equipment-table-row-skeleton';
import ShowEquipmentInfoDialog from '../crud/show-equipment-info-dialog';
import DeleteConfirmationDialog from '../crud/delete-confirmation-dialog';
import AddMaintenanceDialog from '../../maintenance/crud/add-maintenance-form-dialog';

// ----------------------------------------------------------------------

export default function EquipmentView() {
  const dispatch = useDispatch();
  const data = useSelector(selectEquipment);
  const status = useSelector(selectEquipmentStatus);

  const employees = useSelector(selectEmployees);
  const employeeStatus = useSelector(selectEmployeeStatus);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowSelected, setRowSelected] = useState({});

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

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, equipment) => {
    const { name } = equipment;
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      setRowSelected(equipment);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    } else {
      setRowSelected({});
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleOpenAddEquipmentDialog = () => {
    dispatch(openDialog({ dialogType: 'addEquipment' }));
  };

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Inventario</Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenAddEquipmentDialog}
        >
          Añadir Equipo
        </Button>
      </Stack>

      <Card>
        <EquipmentTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <EquipmentTableHead
                order={order}
                orderBy={orderBy}
                rowCount={data.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'code', label: 'Código' },
                  { id: 'name', label: 'Equipo' },
                  { id: 'location', label: 'Ubicacion' },
                  { id: 'purchaseDate', label: 'Fecha de compra' },
                  { id: 'serialNumber', label: 'Serial' },
                  { id: 'model', label: 'Modelo' },
                  { id: 'category', label: 'Categoria' },
                  { id: 'accountable', label: 'Responsable' },
                  { id: '' },
                ]}
              />

              <TableBody>
                {status === 'loading' // Verifica si los datos están cargando
                  ? // Renderiza el Skeleton para simular las celdas mientras se cargan los datos
                    Array.from(Array(rowsPerPage).keys()).map((index) => (
                      <EquipmentTableRowSkeleton key={index} />
                    ))
                  : // Renderiza los datos normales si no están cargando
                    dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((rowInfo) => {
                        const { id, name } = rowInfo;
                        return (
                          <EquipmentTableRow
                            key={id}
                            rowInfo={rowInfo}
                            employees={employees}
                            selected={selected.indexOf(name) !== -1}
                            handleClick={(event) => handleClick(event, rowInfo)}
                          />
                        );
                      })}

                {status === 'failed' && (
                  <TableRow>
                    <TableCell colSpan={9}>
                      <Container
                        sx={{
                          mt: 3,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="h4">Error al cargar los datos</Typography>
                      </Container>
                    </TableCell>
                  </TableRow>
                )}

                <TableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, data.length)} />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <AddEquipmentDialog />

      <AddMaintenanceDialog inventory={data} selected={rowSelected} />

      <DeleteConfirmationDialog />

      <EditEquipmentDialog employees={employees} />

      <ShowEquipmentInfoDialog />
    </Container>
  );
}
