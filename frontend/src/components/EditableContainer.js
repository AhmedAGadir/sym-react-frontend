import React, { useState } from "react";
import Loader from "../components/Loader";
import Alert from "./Alert";

const EditableContainerWrapper = ({ children, editing, onSubmit }) => {
	return editing ? (
		<form onSubmit={onSubmit}>{children}</form>
	) : (
		<div>{children}</div>
	);
};

const EditableContainer = ({
	children,
	editLabel = "Edit",
	renderHeader = () => <div className="flex-1"></div>,
	onEditingStarted = () => {},
	onEditingStopped = async () => ({ abortStopEditing: false }),
}) => {
	const [editing, setEditing] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [saveStatus, setSaveStatus] = useState(null);

	const startEditing = () => {
		setSaveStatus(null);
		setEditing(true);
		onEditingStarted();
	};

	const stopEditing = async (rollback) => {
		if (!rollback) {
			setSubmitting(true);
		}

		const { abortStopEditing, saveStatus } = await onEditingStopped(rollback);

		setSubmitting(false);
		setSaveStatus(saveStatus);

		if (abortStopEditing) {
			return;
		}

		setEditing(false);
	};

	const onFormSubmit = async (e) => {
		e.preventDefault();
		stopEditing(false);
	};

	return (
		<EditableContainerWrapper editing={editing} onSubmit={onFormSubmit}>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-start">
					{renderHeader(editing, submitting)}
					<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
						{!editing && (
							<button
								type="button"
								onClick={startEditing}
								className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
							>
								{editLabel}
							</button>
						)}
						{editing && (
							<div className="flex gap-x-2">
								<button
									type="button"
									onClick={() => stopEditing(true)}
									className="rounded-md bg-white px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
									disabled={submitting}
								>
									{submitting ? <Loader /> : "Save"}
								</button>
							</div>
						)}
					</div>
				</div>
				<div className="mt-3">
					{saveStatus && saveStatus.success && (
						<Alert type="success">{saveStatus.message}</Alert>
					)}
					{saveStatus && !saveStatus.success && (
						<Alert type="danger">
							{Array.isArray(saveStatus.message) ? (
								<div className="flex">
									<div>
										<span className="font-medium">
											Ensure that these requirements are met:
										</span>
										<ul className="mt-1.5 list-disc list-inside">
											{saveStatus.message.map((msg) => (
												<li key={msg}>{msg}</li>
											))}
										</ul>
									</div>
								</div>
							) : (
								<span>{saveStatus.message}</span>
							)}
						</Alert>
					)}
				</div>
				{children({ editing, submitting })}
			</div>
		</EditableContainerWrapper>
	);
};

export default EditableContainer;
