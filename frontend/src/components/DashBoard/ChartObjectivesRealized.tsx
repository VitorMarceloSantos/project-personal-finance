import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import Chart from 'react-apexcharts';
import { ObjectivesData } from '../../data/ObjectivesData';

export const ChartObjectivesRealized = () => {
	// https://blog.logrocket.com/charting-react-apexcharts/
	const { state } = useContext(ThemeContext);
	const valueRealizedAndTotal = { value: 0, realized: 0 };
	let percentageRealized = 0;
	if (ObjectivesData.length !== 0) {
		for (let i = 0; i < ObjectivesData.length; i += 1) {
			valueRealizedAndTotal.realized += ObjectivesData[i].realized;
			valueRealizedAndTotal.value += ObjectivesData[i].value as number;
		}
		percentageRealized = Number(((valueRealizedAndTotal.realized / valueRealizedAndTotal.value) * 100).toFixed(1));
	}
	const colorTextTheme = state === 'dark' ? '#F0F5FF' : '#000';
	const series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined = [percentageRealized];
	const options: any = {
		chart: {
			type: 'radialBar',
			offsetY: -20,
			sparkline: {
				enabled: true,
			},
		},
		plotOptions: {
			radialBar: {
				startAngle: -90,
				endAngle: 90,
				track: {
					background: '#fff',
					strokeWidth: '97%',
					margin: 5, // margin is in pixels
					dropShadow: {
						enabled: false,
					},
				},
				dataLabels: {
					name: {
						show: false,
					},
					value: {
						offsetY: -2,
						fontSize: '1.5rem',
						color: colorTextTheme,
						fontWeight: 'bold',
					},
				},
			},
		},
		grid: {
			padding: {
				top: 3,
			},
		},
		fill: {
			type: 'gradient',
			gradient: {
				shade: 'light',
				shadeIntensity: 0.4,
				inverseColors: false,
				opacityFrom: 1,
				opacityTo: 1,
				stops: [0, 50, 53, 91],
			},
			colors: ['#6321ce'],
		},
		labels: ['Progress'], //label of this diagram
	};

	return (
		<section className={`${state}-chart-objectives-realized`}>
			<p className='chart-objectives-realized-title'>Metas</p>
			<Chart options={options} series={series} type='radialBar' />
		</section>
	);
};
