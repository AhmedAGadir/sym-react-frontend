import { useState, useEffect } from "react";

const useOrganizationData = () => {
	const [organization, setOrganization] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let mounted = true;
		const fetchData = async () => {
			try {
				const response = await fetch("/get-data");
				const data = await response.json();
				if (mounted) {
					setOrganization(data.organization);
					setLoading(false);
				}
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};
		fetchData();
		return () => {
			mounted = false;
		};
	}, []);

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

			if (!response.ok) {
				throw new Error("Failed to update team.");
			}

			setOrganization(updatedOrganization);
			return { success: true };
		} catch (error) {
			setError(error);
			return { success: false };
		}
	};

	const updateMember = async (teamInd, memberInd, updatedMember) => {
		// const updatedOrganization = { ...organization };
		// updatedOrganization.teams[teamInd].members[memberInd] = updatedMember;
		// // setLoading(true);
		// try {
		// 	const response = await fetch("/store-data", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify(updatedOrganization),
		// 	});
		// 	if (!response.ok) {
		// 		throw new Error("Failed to update member.");
		// 	}
		// 	setOrganization(updatedOrganization);
		// 	// setLoading(false);
		// } catch (error) {
		// 	setError(error);
		// 	// setLoading(false);
		// }
	};

	return { organization, loading, error, updateTeams, updateMember };
};

export default useOrganizationData;
