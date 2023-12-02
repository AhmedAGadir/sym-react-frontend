import { Navigate, useParams } from "react-router-dom";

const MemberRedirectPage = () => {
	const { teamId } = useParams();
	return <Navigate to={`/team/${teamId}`} />;
};

export default MemberRedirectPage;
