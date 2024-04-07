import { Box } from '@mui/material';

export default function TaskColorLegend() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
        '@media (max-width: 600px)': {
          flexWrap: 'wrap',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: 'red',
            mr: 1,
          }}
        />
        <span>Pendiente</span>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: 'blue',
            mr: 1,
          }}
        />
        <span>En Progreso</span>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: 'green',
            mr: 1,
          }}
        />
        <span>Ejecutado</span>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: 'gray',
            mr: 1,
          }}
        />
        <span>Cancelado</span>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: 'orange',
            mr: 1,
          }}
        />
        <span>Reprogramado</span>
      </Box>
    </Box>
  );
}
