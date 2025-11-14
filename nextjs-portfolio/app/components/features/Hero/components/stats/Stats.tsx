import { StatItem } from "./StatItem";

export interface StatsProps {
	yearsExperience: number;
	frontendYears: number;
	backendYears: number;
	frontendMonths: number;
	backendMonths: number;
	projectsCount: number;
	workHours: number;
}

export function Stats({
	yearsExperience,
	frontendYears,
	backendYears,
	frontendMonths,
	backendMonths,
	projectsCount,
	workHours,
}: StatsProps) {
	return (
		<div className="absolute bottom-8 left-0 right-0 md:left-auto md:right-8 flex flex-row md:flex-col justify-center md:justify-start items-center md:items-end gap-8 md:gap-4 w-full md:w-auto px-4 md:px-0 md:space-y-4 md:text-right">
			<StatItem
				value={yearsExperience}
				label="Years of Experience"
				tooltip={
					<>
						<p className="font-light">Experience Breakdown:</p>
						<ul className="text-left list-disc pl-4 mt-1 space-y-1">
							<li>
								Frontend: {frontendYears} {frontendYears === 1 ? "year" : "years"}{" "}
								{frontendMonths > 0 &&
									`and ${frontendMonths} ${frontendMonths === 1 ? "month" : "months"}`}
							</li>
							<li>
								Backend: {backendYears} {backendYears === 1 ? "year" : "years"}{" "}
								{backendMonths > 0 &&
									`and ${backendMonths} ${backendMonths === 1 ? "month" : "months"}`}
							</li>
						</ul>
					</>
				}
				delay={1.0}
			/>

			<StatItem value={projectsCount} label="Completed Projects" delay={1.1} />

			<StatItem
				value={`${(workHours / 1000).toLocaleString("en-US")}K`}
				label="Hours Coded"
				tooltip={
					<>
						<p className="font-light">Based on:</p>
						<ul className="text-left list-disc pl-4 mt-1 space-y-1">
							<li>Started December 2020</li>
							<li>40h work week (Mon-Fri)</li>
							<li>32 days off per year</li>
							<li>Updates hourly</li>
						</ul>
					</>
				}
				delay={1.2}
			/>
		</div>
	);
}
