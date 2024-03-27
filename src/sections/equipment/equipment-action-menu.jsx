import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { openDialog } from 'src/features/dialogs/dialogsSlice';

import ActionMenu from '../../components/action-menu/action-menu';

export default function MaintenanceActionMenu({ equipmentId }) {
    const dispatch = useDispatch();

  const handleShowInfo = (id) => {
    dispatch(openDialog({ dialogType: 'showEquipmentInfo', data: id }));
  };

  const handleDownloadManual = () => {
    console.log('Descargar manual');
  };

  const handleEdit = (id) => {
    dispatch(openDialog({ dialogType: 'editEquipment', data: id }));
  };

  const handleDelete = (id) => {
    dispatch(openDialog({ dialogType: 'deleteEquipment', data: id }));
  };

  const equipmentActions = [
    {
      label: 'Ver información',
      icon: 'eva:eye-fill',
      onClick: handleShowInfo,
    },
    {
      label: 'Descargar manual',
      icon: 'eva:download-fill',
      onClick: handleDownloadManual,
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

  return <ActionMenu actions={equipmentActions} itemId={equipmentId} />;
}

MaintenanceActionMenu.propTypes = {
  equipmentId: PropTypes.string,
};
