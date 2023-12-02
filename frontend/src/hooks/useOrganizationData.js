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

	const updateTeam = async (teamInd, updatedTeam) => {
		const updatedOrganization = { ...organization };
		updatedOrganization.teams[teamInd] = updatedTeam;

		setLoading(true);
		try {
			const response = await fetch("/store-data", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedOrganization),
			});

			if (!response.ok) {
				throw new Error("Failed to update team.");
			}

			const data = await response.json();
			setOrganization(data);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	const updateMember = async (teamInd, memberInd, updatedMember) => {
		const updatedOrganization = { ...organization };
		updatedOrganization.teams[teamInd].members[memberInd] = updatedMember;

		setLoading(true);
		try {
			const response = await fetch("/store-data", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedOrganization),
			});

			if (!response.ok) {
				throw new Error("Failed to update member.");
			}

			const data = await response.json();
			setOrganization(data);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	return { organization, loading, error, updateTeam, updateMember };
};

export default useOrganizationData;