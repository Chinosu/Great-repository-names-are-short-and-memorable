// import React from 'react';
// import Stack from "@mui/material/Stack";
// import { styled } from "@mui/material/styles";
// import { useNavigate } from 'react-router-dom';
// import Calendar from './Calendar';

// /**
//  * Landing Component
//  * 
//  * This component represents the landing page of the application. It serves as the entry point for users,
//  * providing options to log in or explore events. The landing page includes introductory text and buttons
//  * to guide user interaction.
//  *
//  * @component
//  * @returns {JSX.Element} The rendered landing page of the application.
//  */
// const Landing: React.FC = () => {
//   return (
//     <Stack alignItems="center">
//       <LandingScreenContainer>
//         {/* Temporary */}
//         <div className="landing-container">
//           <div className="landing-content">
//             <h1>Welcome to Great-repository-names-are-short-and-memorable</h1>
//             <p>
//               Your go-to platform for discovering UNSW society events. 
//               Stay updated with the latest happenings around campus, and get involved!
//             </p>
            
//             <div className="landing-buttons">
//               {/* <button className="login-btn">
//                 Log In
//               </button>
//               <button className="explore-btn">
//                 Explore Events
//               </button> */}
//               <Calendar/>
//             </div>
//           </div>
//         </div>
//         {/* Add more components here */}
//       </LandingScreenContainer>
//     </Stack>
   
//   );
// };

// /**
//  * A styled MUI Stack component that serves as the container for the landing screen content.
//  * The container is centered, and it takes up 80% of the width with appropriate margins.
//  */
// const LandingScreenContainer = styled(Stack)(({ theme }) => ({
//   height: "100%",
//   width: "80%",
//   margin: "auto",
// }));

// export default Landing;
