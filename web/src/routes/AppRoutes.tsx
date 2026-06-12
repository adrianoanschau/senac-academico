import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ServerWakeup } from "../components/ServerWakeup";
import { AuthProvider } from "../contexts/AuthContext";

const MainLayout = lazy(() =>
  import("../layouts/MainLayout").then((m) => ({ default: m.MainLayout })),
);
const ProtectedRoute = lazy(() =>
  import("../components/ProtectedRoute").then((m) => ({
    default: m.ProtectedRoute,
  })),
);

const Home = lazy(() =>
  import("../pages/Home").then((m) => ({ default: m.Home })),
);
const Placeholder = lazy(() =>
  import("../pages/Placeholder").then((m) => ({ default: m.Placeholder })),
);
const Login = lazy(() =>
  import("../pages/Login").then((m) => ({ default: m.Login })),
);
const ForgotPassword = lazy(() =>
  import("../pages/ForgotPassword").then((m) => ({
    default: m.ForgotPassword,
  })),
);
const UpdatePassword = lazy(() =>
  import("../pages/UpdatePassword").then((m) => ({
    default: m.UpdatePassword,
  })),
);
const Professors = lazy(() =>
  import("../pages/Professors").then((m) => ({ default: m.Professors })),
);
const Rooms = lazy(() =>
  import("../pages/Rooms").then((m) => ({ default: m.Rooms })),
);
const CalendarReserves = lazy(() =>
  import("../pages/CalendarReserves").then((m) => ({
    default: m.CalendarReserves,
  })),
);
const Subjects = lazy(() =>
  import("../pages/Subjects").then((m) => ({ default: m.Subjects })),
);
const ClassGroups = lazy(() =>
  import("../pages/ClassGroups").then((m) => ({ default: m.ClassGroups })),
);
const Curriculums = lazy(() =>
  import("../pages/Curriculums").then((m) => ({ default: m.Curriculums })),
);
const Schedule = lazy(() =>
  import("../pages/Schedule").then((m) => ({ default: m.Schedule })),
);
const Courses = lazy(() =>
  import("../pages/Courses").then((m) => ({ default: m.Courses })),
);
const Settings = lazy(() =>
  import("../pages/Settings").then((m) => ({ default: m.Settings })),
);

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ServerWakeup>
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen text-slate-500">
                Carregando...
              </div>
            }
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="students" element={<Placeholder />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="class-groups" element={<ClassGroups />} />
                  <Route path="schedule" element={<Schedule />} />
                  <Route path="curriculums" element={<Curriculums />} />
                  <Route path="enrollments" element={<Placeholder />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="professors" element={<Professors />} />
                  <Route path="rooms" element={<Rooms />} />
                  <Route
                    path="calendar-reserves"
                    element={<CalendarReserves />}
                  />
                  <Route path="subjects" element={<Subjects />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </ServerWakeup>
      </AuthProvider>
    </BrowserRouter>
  );
};
