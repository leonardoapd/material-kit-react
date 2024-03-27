import PropTypes from 'prop-types';

import ActionMenu from '../../components/action-menu/action-menu';

export default function MaintenanceActionMenu({ maintenanceId }) {
  const handleShowInfo = () => {
    console.log('Mostrar información');
  };

  const handleEdit = () => {
    console.log('Editar');
  };

  const handleDelete = () => {
    console.log('Eliminar');
  };

  const maintenanceActions = [
    {
      label: 'Ver información',
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
