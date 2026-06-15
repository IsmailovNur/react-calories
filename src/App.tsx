import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "./routing/routes.ts";

import AppHeader from "./widgets/AppHeader/AppHeader.tsx";
import AppFooter from "./widgets/AppFooter/AppFooter.tsx";

import MealsPage from "./pages/MealsPage/MealsPage.tsx";
import MealForm from "./pages/MealForm/MealForm.tsx";

import './App.css';

const App = () => {

  return (
    <>
      <Layout className="App-wrapper">
        <AppHeader />
        <Content className="layout-content">
          <Routes>
            <Route path={AppRoutes.main} element={<MealsPage />} />
            <Route path={AppRoutes.addPage} element={<MealForm />} />
            <Route path={AppRoutes.editPage} element={<MealForm />} />
          </Routes>
        </Content>
        <AppFooter />
      </Layout>
    </>
  )
}

export default App;
