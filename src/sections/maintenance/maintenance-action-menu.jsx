import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { openDialog } from 'src/features/dialogs/dialogsSlice';

import ActionMenu from 'src/components/action-menu/action-menu';

export default function MaintenanceActionMenu({ maintenanceId }) {
  const dispatch = useDispatch();

  const handleShowInfo = (id) => {
    dispatch(openDialog({ dialogType: 'showMaintenanceInfo', data: id }));
  };

  const handleEdit = (id) => {
    dispatch(openDialog({ dialogType: 'editMaintenance', data: id }));
  };

  const handleDelete = (id) => {
    dispatch(openDialog({ dialogType: 'deleteMaintenance', data: id }));
  };

  const maintenanceActions = [
    {
      label: 'Ver Detalles',
      icon: 'eva:eye-fill',
      onClick: handleShowInfo,
    },
    {
      label: 'Editar',
      icon: 'eva:edit-fill',
      onClick: handleEdit,
    },
    {
      label: 'Eliminar',
      icon: 'eva:trash-2-outline',
      onClick: handleDelete,
      color: 'error.main',
    },
  ];

  return <ActionMenu actions={maintenanceActions} itemId={maintenanceId} />;
}

MaintenanceActionMenu.propTypes = {
  maintenanceId: PropTypes.string,
};
