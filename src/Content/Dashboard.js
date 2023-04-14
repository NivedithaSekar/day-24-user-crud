import * as React from 'react';


function Dashboard() {
    return(
        <div>
        <h1><b><em><u>Task Summary</u></em></b></h1>
        <p>Design an UI to implement the <b>CRUD(CRUD - Create,Read,Update,Delete)</b></p>
            <ul style={{listStyleType:'none'}}>
                <li>// Dashboard - Landing page</li>
                <li>// List Users</li>
                <li>// Create User</li>
                <li>// Edit User</li>
                <li>// Profile </li>
                <li>// Edit Profile</li>
            </ul>
        <p>Dashboard is the landing page summarized the task given. To explore more on Users List & their profiles. Use the Navigation Icon at the top-left.</p>
        </div>
    );
}

export default Dashboard;
