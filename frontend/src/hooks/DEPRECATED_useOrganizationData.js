import { useState, useEffect, useCallback } from "react";

const useOrganizationData = () => {
	const [organization, setOrganization] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = useCallback(async () => {
		try {
			const response = await fetch("/get-data");
			const data = await response.json();

			if (!response.ok) {
				throw new Error(`${data.message}. Please try again.`);
			}
			setOrganization(data.organization);
			setLoading(false);
			setError(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	}, [setOrganization, setLoading, setError]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const refetch = () => {
		setLoading(true);
		fetchData();
	};

	const updateTeams = async (updatedTeams) => {
		const updatedOrganization = { ...organization };
		updatedOrganization.teams = updatedTeams;

		try {
			const response = await fetch("/store-data", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					organization: updatedOrganization,
				}),
			});

			const { message } = await response.json();

			if (!response.ok) {
				throw new Error(`${message}. Please try again.`);
			}

			setOrganization(updatedOrganization);
			return { success: true, message };
		} catch (error) {
			return { success: false, message: error.message };
		}
	};

	return { organization, loading, error, updateTeams, refetch };
};

export default useOrganizationData;
