import Home from "../pages/Home"
import Login from "../pages/Login"
import SignUp from "../pages/Signup"
import ForgotPassword from "../pages/Forgotpassword"
import Dashboard from "../pages/Admin/Dashboard"
import FormContribute from "../pages/FormContribute"
import Users from "../pages/Admin/User"
import ContributionManagement from "../pages/Admin/ContributionManagement"
import Heritage from "../pages/Admin/HeritageManagement/Heritage"
import CreateUser from "../pages/Admin/User/CreateUser"
import CreateHeritage from "../pages/Admin/HeritageManagement/Heritage/CreaterHeritage"
import FormSupport from "../pages/Support"
import Events from "../pages/Admin/HeritageManagement/EventManager"
import UpdateUser from "../pages/Admin/User/UpdateUser"
import UpdateHeritage from "../pages/Admin/HeritageManagement/Heritage/UpdateHeritage"
import Feedback from "../pages/Admin/User/Feedback"
import UpdateContribute from "../pages/Admin/ContributionManagement/updateContribute"
import History from "../pages/History"
import ChangePassword from "../pages/ChangePassword"
import CreateEvent from "../pages/Admin/HeritageManagement/EventManager/CreateEvents"
import UpdateEvent from "../pages/Admin/HeritageManagement/EventManager/UpdateEvents"
import FormHistory from "../pages/History/UpdateHistory"
import InfoUser from "../pages/InfoUser"

const publicRoutes =  [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/forgotpassword', component: ForgotPassword },
]

const privateRoutes =  [
    { path: '/contribute', component: FormContribute },
    { path: '/formsupport', component: FormSupport },
    { path: '/history', component: History },
    { path: '/history/updatehistory/:id', component: FormHistory },
    { path: '/changepassword', component: ChangePassword },
    { path: '/informationuser', component: InfoUser },

]

const adminRoutes = [
    { path: '/admin/', component: Dashboard },
    { path: '/admin/dashboard', component: Dashboard },
    { path: '/admin/contributemanagement', component: ContributionManagement },
    { path: '/admin/heritage', component: Heritage },
    { path: '/admin/events', component: Events },
    { path: '/admin/events/create-event', component: CreateEvent },
    { path: '/admin/users', component: Users },
    { path: '/admin/feedback', component: Feedback },
    { path: '/admin/users/create-user', component: CreateUser },
    { path: '/admin/users/update-user/:id', component: UpdateUser },
    { path: '/admin/heritage/create-heritage', component: CreateHeritage },
    { path: '/admin/heritage/update-heritage/:id', component: UpdateHeritage },
    { path: '/admin/contributemanagement/update-contribute/:id', component: UpdateContribute },
    { path: '/admin/events/update-event/:id', component: UpdateEvent },
]

export { privateRoutes, publicRoutes, adminRoutes }