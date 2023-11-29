Your task is to create a React frontend for an existing backend.

Download the source code of the backend attached.
The backend has two endpoints. One endpoint is used to store data on the webserver and the other endpoint is used to fetch data from the endpoint. The information needed to make requests is in the source code.
For this task, you are not allowed to modify the backend.
Each endpoint takes 2 seconds to run and has a 50% chance of failing.
The backend is used to manage information related to the organization. You can look at the data.json file in the backend source code to learn more about the data.
The organization is split into teams. Each team has a name and members. Each members has a name, email and start date. Each team has one team lead, which must be a team member. A person cannot be in more than one team.
Create a frontend that has two routes, one to view/modify team data, and the other to view/modify individual member data.
You should be able to change the team name and move people from one team to another.
Don't forget: each team should always have a team leader and this should always be true for data stored in the backend.
You are NOT allowed to use ANY libraries apart from React and Tailwind.
You may use any Browser APIs
Every modification on the frontend must be instantaneous from the user's perspective. However, if something unexpected happens on the backend, a modal must popup to tell the user that something went wrong, some data may have been lost and that they need to refresh.
If the user refreshes the page, they must see the latest data that's available from the backend.
You may use ChatGPT/Stackoverflow/Phind/Copilot/etc... . Make sure to always paste the query or prompt whenever you use these tools so we know you didn't write it yourself. It is against your best interest to use code you do not completely understand. There is no penalty whatsoever and using these tools in a clever manner reflects well on the candidate.
You will be asked to change the code during follow up interview. How intimately you understand every line of code and how your components/functions relate to one another will be assessed during that follow up interview.
To submit the solution, create a zip file following these instructions and send it to aslee@symmetryinvestments.com 
Please let me know if you have any questions.