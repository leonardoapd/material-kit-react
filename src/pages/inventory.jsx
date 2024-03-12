import { Helmet } from 'react-helmet-async';

import { EquipmentView } from 'src/sections/equipment/view';

// ----------------------------------------------------------------------
export default function InventoryPage() {
  return (
    <>
      <Helmet>
        <title> Equipment | Minimal UI </title>
      </Helmet>

      <EquipmentView />
    </>
  );
}