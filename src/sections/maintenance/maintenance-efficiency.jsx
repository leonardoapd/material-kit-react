import PropTypes from 'prop-types';
import GaugeChart from 'react-gauge-chart';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

// ----------------------------------------------------------------------

export default function MaintenanceEfficiency({ title, subheader, chart, ...other }) {
  const { percent } = chart;

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
      <GaugeChart
            id="gauge-chart5"
            nrOfLevels={420}
            arcsLength={[0.6, 0.2, 0.2]}
            colors={['#EA4228', '#F5CD19', '#5BE12C']}
            percent={percent}
            arcPadding={0.02}
            textColor="black"
            animate
            cornerRadius={6} 
            needleColor="#345243" 
          />
      </Box>
    </Card>
  );
}

MaintenanceEfficiency.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chart: PropTypes.object,
};
