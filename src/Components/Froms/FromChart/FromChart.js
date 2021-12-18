import { Bar, Column, Liquid, Pie, RadialBar, Rose } from "@ant-design/charts";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactDOM from "react-dom";

function FromChart(props) {
	let { allTask, projectDetail } = props;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({
			type: "SET_NONE",
		});
	}, []);

	let Status = projectDetail?.lstTask?.map((countTask) => {
		return {
			values: countTask?.lstTaskDeTail?.length,
		};
	});
	let dataRose = allTask?.map((task) => {
		return {
			type: task.taskName,
			value: task.originalEstimate,
		};
	});

	const originalEstimateTotal = useMemo(() => {
		const result = allTask?.reduce((result, prod) => {
			return result + prod.originalEstimate;
		}, 0);
		return result;
	}, [allTask]);

	const dataPie = [
		{
			type: "BackLog",
			value: Status[0]?.values,
		},
		{
			type: "Select For Development",
			value: Status[1]?.values,
		},
		{
			type: "In progress",
			value: Status[2]?.values,
		},
		{
			type: "Done",
			value: Status[3]?.values,
		},
	];
	const configRose = {
		data: dataRose,
		xField: "type",
		yField: "value",
		seriesField: "type",
		radius: 0.9,
		legend: {
			position: "bottom",
		},
	};
	const configPie = {
		appendPadding: 10,
		data: dataPie,
		angleField: "value",
		colorField: "type",
		radius: 0.8,
		label: {
			type: "outer",
			content: "{name} {percentage}",
		},
		interactions: [
			{
				type: "pie-legend-active",
			},
			{
				type: "element-active",
			},
		],
	};



	const newValues = [].concat(...allTask.map((task) => [
		{
			label: task?.taskName,
			type: "Time Tracking Spent",
			value: task?.timeTrackingSpent,
		},
		{
			label: task?.taskName,
			type: "Time Tracking Remaining",
			value: task?.timeTrackingRemaining,
		},
	])); 
	

	
	const configBar = {
		data: newValues,
		isGroup: true,
		xField: "value",
		yField: "label",
		seriesField: "type",
		dodgePadding: 4,
		intervalPadding: 20,
		label: {
			// 可手动配置 label 数据标签位置
			position: "middle",
			// 'left', 'middle', 'right'
			// 可配置附加的布局方法
			layout: [
				// 柱形图数据标签位置自动调整
				{
					type: "interval-adjust-position",
				}, // 数据标签防遮挡
				{
					type: "interval-hide-overlap",
				}, // 数据标签文颜色自动调整
				{
					type: "adjust-color",
				},
			],
		},
	};
	const strDome = () =>
	{
		let tong = Number(Status[3].values) / (Number(Status[0].values) + Number(Status[1].values) + Number(Status[2].values) + Number(Status[3].values))
		return tong
	}
 
	const configLiquid = {
    percent: strDome(),
    shape: 'rect',
    outline: {
      border: 2,
      distance: 4,
    },
    wave: {
      length: 128,
    },
	};
	

	const dataRadialBar = projectDetail?.members?.map((member) =>
	{
		return {
			name: member?.name,
			TaskAssign: allTask?.filter(task => task.UserAssignTask.find(idUser => idUser.userId === member.userId)?.userId === member.userId).length
		}
	})
	
	const configRadialBar = {
    data: dataRadialBar,
    xField: 'name',
    yField: 'TaskAssign',
    radius: 1,
    innerRadius: 0.4,
   
    startAngle: Math.PI * 0.5,
    endAngle: Math.PI * 2.5,
    tooltip: {
      showMarkers: true,
    },
    type: 'line',
    annotations: [
      {
        type: 'text',
        position: ['50%', '50%'],
        content: projectDetail?.projectName,
        style: {
          textAlign: 'center',
          fontSize: 24,
        },
      },
    ],
  };
	return (
		<div>
			<div className="row">
				<div className="col-6 mt-2">
					<h4>Original Estimate</h4>
					<p>Total Original Estimate: {originalEstimateTotal}</p>
					<Rose {...configRose} />
				</div>
				<div className="col-6 mt-2">
					<h4 >Percent status:</h4>
					<Pie {...configPie} />
				</div>
				<div className="col-12 mt-2 mb-3">
					<h4 className="mb-5">Show total Time Spent and Time Remaining with annotations:</h4>
					<Bar {...configBar} />
				</div>
				<div className="col-6 mt-2">
					<h4>Project completion:</h4>
					<Liquid {...configLiquid} /></div>
				<div className="col-6 mt-2">
				<h4>User Assign Task:</h4>
					<RadialBar {...configRadialBar} />
				</div>
			</div>
		</div>
	);
}
export default memo(FromChart);
