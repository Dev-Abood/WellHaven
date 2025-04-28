export type WelcomeStepData = {
	type: "welcome";
	title: string;
	titleHighlight: string;
	description: string;
	image: string;
};

export type RegularStepData = {
	type: "step";
	step: string;
	title: string;
	titleHighlight: string;
	titleEnd?: string;
	bgColor: string;
	textColor: string;
	highlightColor: string;
	progressColor: string;
	image: string;
};
