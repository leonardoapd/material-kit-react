import { Helmet } from 'react-helmet-async';

import { MaintenanceTaskView } from 'src/sections/maintenance-task/view';

// ----------------------------------------------------------------------

export default function MaintenanceTaskPage() {
  return (
    <>
      <Helmet>
        <title> Tareas de Mantenimiento | Sumilan </title>
      </Helmet>

      <MaintenanceTaskView />
    </>
  );
}
