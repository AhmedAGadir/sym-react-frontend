import React from "react";

const Modal = ({ message, renderButton }) => {
	return (
		<div
			id="static-modal"
			data-modal-backdrop="static"
			tabIndex={-1}
			aria-hidden="true"
			className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
		>
			<div className="relative p-4 w-full max-w-2xl max-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<div className="relative bg-white rounded-lg shadow drop-shadow-lg">
					<div className="flex items-center justify-between p-4 md:p-5 rounded-t ">
						<h3 className="text-2xl font-bold text-red-500 text-center ">
							{message}
						</h3>
					</div>
					{renderButton?.()}
				</div>
			</div>
		</div>
	);
};

export default Modal;
