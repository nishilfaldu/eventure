
// import { MockedProvider } from "@apollo/client/testing";
// import { render, screen, waitFor } from "@testing-library/react";
// import { App } from "antd";
// import { Provider as ReduxProvider } from "react-redux";
// import { v4 as uuid4 } from "uuid";

// import { AppLayout } from "@/components/AppLayout";
// import store from "@/redux/store";


// // If this test is failing with a "Configuration error" thrown by Jest, ensure you have run `yarn generate` in the client folder.

// // https://github.com/vercel/next.js/issues/7479#issuecomment-533657701
// jest.mock("next/router", () => ({
//   useRouter() {
//     return {
//       route: "/",
//       pathname: "",
//       query: "",
//       asPath: "",
//     };
//   },
// }));

// describe("App Layout", () => {
//   it("renders the app layout with supplied content", async () => {
//     const testString = uuid4();
//     render(
//       <ReduxProvider store={store}>
//         <MockedProvider>
//           <App>
//             <AppLayout>
//               <p>{testString}</p>
//             </AppLayout>
//           </App>
//         </MockedProvider>
//       </ReduxProvider>,
//     );

//     // `waitFor` React components to finish rendering
//     return waitFor(() => {
//       expect(screen.getByText(testString)).toBeInTheDocument();
//     });
//   });
// });
