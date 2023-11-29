const getOrganization = () =>
	fetch("http://localhost:4444/get-data")
		.then((response) => {
			console.log("response", response);
			if (!response.ok) {
				// copilot for the error message
				throw new Error("Failed to fetch organization data.");
			}
			return response.json();
		})
		.catch((error) => {
			console.log("error", error);
			throw error;
		});

const createOrganizationService = () => ({
	getOrganization,
});

// export default createOrganizationService;

const organizationService = createOrganizationService();

export default organizationService;
