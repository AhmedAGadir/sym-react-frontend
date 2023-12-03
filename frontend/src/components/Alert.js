import React from "react";

const Alert = ({ type, message }) => {
	switch (type) {
		case "success":
			return (
				<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50">
					{message}
				</div>
			);
		case "danger": {
			if (message.length <= 1) {
				return (
					<div
						className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
						role="alert"
					>
						{message[0]}
					</div>
				);
			} else {
				return (
					<div
						className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
						role="alert"
					>
						<span className="sr-only">Danger</span>
						<div>
							<span className="font-medium">
								Ensure that these requirements are met:
							</span>
							<ul className="mt-1.5 list-disc list-inside">
								{message.map((msg) => (
									<li key={msg}>{msg}</li>
								))}
							</ul>
						</div>
					</div>
				);
			}
		}
		default:
			return null;
	}
};

export default Alert;
