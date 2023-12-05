import { useState, useEffect, useCallback } from "react";

let data = {
	organization: {
		name: "Sample Organization",
		teams: [
			{
				teamName: "Team Alpha",
				members: [
					{
						firstName: "John",
						lastName: "Doe",
						email: "john.doe@email.com",
						startDate: "2021-01-01",
						isTeamLead: true,
					},
					{
						firstName: "Jane",
						lastName: "Smith",
						email: "jane.smith@email.com",
						startDate: "2021-02-15",
						isTeamLead: false,
					},
					{
						firstName: "Alice",
						lastName: "Johnson",
						email: "alice.johnson@email.com",
						startDate: "2021-03-10",
						isTeamLead: false,
					},
					{
						firstName: "Bob",
						lastName: "Brown",
						email: "bob.brown@email.com",
						startDate: "2021-04-05",
						isTeamLead: false,
					},
				],
			},
			{
				teamName: "Team Beta",
				members: [
					{
						firstName: "Charlie",
						lastName: "Davis",
						email: "charlie.davis@email.com",
						startDate: "2021-05-05",
						isTeamLead: true,
					},
					{
						firstName: "Diana",
						lastName: "Evans",
						email: "diana.evans@email.com",
						startDate: "2021-06-06",
						isTeamLead: false,
					},
					{
						firstName: "Eva",
						lastName: "Foster",
						email: "eva.foster@email.com",
						startDate: "2021-07-07",
						isTeamLead: false,
					},
					{
						firstName: "Frank",
						lastName: "Green",
						email: "frank.green@email.com",
						startDate: "2021-08-08",
						isTeamLead: false,
					},
				],
			},
			{
				teamName: "Team Gamma",
				members: [
					{
						firstName: "Grace",
						lastName: "Harris",
						email: "grace.harris@email.com",
						startDate: "2021-09-09",
						isTeamLead: true,
					},
					{
						firstName: "Harry",
						lastName: "Isaac",
						email: "harry.isaac@email.com",
						startDate: "2021-10-10",
						isTeamLead: false,
					},
					{
						firstName: "Ivy",
						lastName: "Jones",
						email: "ivy.jones@email.com",
						startDate: "2021-11-11",
						isTeamLead: false,
					},
					{
						firstName: "Jack",
						lastName: "King",
						email: "jack.king@email.com",
						startDate: "2021-12-12",
						isTeamLead: false,
					},
				],
			},
		],
	},
};

const mockFetch = async () => {
	// simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 2000));

	// 50% chance of throwing error
	if (Math.random() < 0.5) {
		return {
			ok: false,
			json: async () => {
				return { message: "Something went wrong" };
			},
		};
	}

	return {
		ok: true,
		json: async () => {
			// if in local storage, use that data instead
			const localStorageData = localStorage.getItem("organizationData");
			if (localStorageData) {
				return JSON.parse(localStorageData);
			}
			return data;
		},
	};
};

const mockUpdate = async (updatedData) => {
	// simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 2000));

	// 50% chance of throwing error
	if (Math.random() < 0.5) {
		return {
			ok: false,
			json: async () => ({ message: "Something went wrong" }),
		};
	}
	data = updatedData;
	localStorage.setItem("organizationData", JSON.stringify(data));

	return {
		ok: true,
		json: async () => ({ message: "Data stored successfully!" }),
	};
};

const useOrganizationData = () => {
	const [organization, setOrganization] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = useCallback(async () => {
		try {
			const response = await mockFetch();
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
			const response = await mockUpdate({
				organization: updatedOrganization,
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
