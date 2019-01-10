
// home
const Home = resolve => require(['components/home.vue'], resolve); // root
const HomeHome = resolve => require(['components/home/home.vue'], resolve);
const Directions = resolve => require(['components/home/directions.vue'], resolve);
const Feedback = resolve => require(['components/home/feedback.vue'], resolve);
const FAQ = resolve => require(['components/home/faq.vue'], resolve);

// excusal
const Excusal = resolve => require(['components/excusal.vue'], resolve);
const ExcusalStatus = resolve => require(['components/excusal/excusalstatus.vue'], resolve);
const ExcusalRequest = resolve => require(['components/excusal/excusalrequest.vue'], resolve);

const Login = resolve => require(['components/login.vue'], resolve);
const Reporting = resolve => require(['components/reporting.vue'], resolve);

const Questionnaire = resolve => require(['components/questionnaire/questionnaire.vue'], resolve);
const QuestionnaireResponses = resolve => require(['components/questionnaire/questionnaireresponses.vue'], resolve);

const Attendance = resolve => require(['components/attendance.vue'], resolve);
const Subscription = resolve => require(['components/subscription.vue'], resolve);
const Calendar = resolve => require(['components/calendar.vue'], resolve);

const Error = resolve => require(['components/error/error.vue'], resolve);
const Error401 = resolve => require(['components/error/error401.vue'], resolve);
const Error403 = resolve => require(['components/error/error403.vue'], resolve);
const Error404 = resolve => require(['components/error/error404.vue'], resolve);
const Error500 = resolve => require(['components/error/error500.vue'], resolve);

export default {
    base: window.location.pathName,
    routes: [
	   {
		  path: '/',
		  redirect: '/home',
	   },
	   {
		  path: '/home',
		  component: Home,
		  children: [
			 {
				path: '',
				component: HomeHome,
				meta: {
				    title: 'Home',
				    tab: 'HomeHome',
				    parent: 'Home'
				},
			 },
			 {
				path: 'directions',
				component: Directions,
				meta: {
				    title: 'Directions',
				    tab: 'Directions',
				    parent: 'Home'
				},
			 },
			 {
				path: 'faq',
				component: FAQ,
				meta: {
				    title: 'FAQ',
				    tab: 'FAQ',
				    parent: 'Home'
				},
			 },
			 {
				path: 'feedback',
				component: Feedback,
				meta: {
				    title: 'Feedback',
				    tab: 'Feedback',
				    parent: 'Home'
				},
			 },
		  ],
	   },
	   {
		  path: '/excusal',
		  component: Excusal,
		  children: [
			 {
				path: 'excusalstatus',
				component: ExcusalStatus,
				meta: {
				    title: 'Excusal/Postponement Status',
				    tab: 'Excusal',
				    parent: 'Excusal'
				},
			 },
			 {
				path: '',
				component: ExcusalRequest,
				meta: {
				    title: 'Excusal/Deferral',
				    tab: 'ExcusalRequest',
				    parent: 'Excusal'
				},
			 },
		  ],
	   },
	   {
		  path: '/login',
		  component: Login,
		  meta: {
			 title: 'Login',
			 tab: 'Login',
		  },
	   },
	   {
		  path: '/reporting',
		  component: Reporting,
		  meta: {
			 title: 'Reporting',
			 tab: 'Reporting',
		  },
	   },
	   {
		  path: '/questionnaire',
		  component: Questionnaire,
		  meta: {
			 title: 'Questionnaire',
			 tab: 'Questionnaire',
		  },
	   },
	   {
		  path: '/questionnaireresponses',
		  component: QuestionnaireResponses,
		  meta: {
			 title: 'Questionnaire Responses',
			 tab: 'Questionnaire Responses',
		  },
	   },
	   {
		  path: '/attendance',
		  component: Attendance,
		  meta: {
			 title: 'Attendance',
			 tab: 'Attendance',
		  },
	   },
	   {
		  path: '/subscription',
		  component: Subscription,
		  meta: {
			 title: 'Notifications',
			 tab: 'Notifications',
		  },
	   },
	   {
		  path: '/calendar',
		  component: Calendar,
		  meta: {
			 title: 'Calendar',
			 tab: 'Calendar',
		  },
	   },
	   {
		  path: '/error',
		  component: Error,
		  children: [{
			 path: '404',
			 component: Error404,
			 meta: {
				title: 'Page Not Found',
			 },
		  },
		  {
			 path: '500',
			 component: Error500,
			 meta: {
				title: 'Error',
			 },
		  },
		  {
			 path: '401',
			 component: Error401,
			 meta: {
				title: 'Not Authorized',
			 },
		  },
		  {
			 path: '403',
			 component: Error403,
			 meta: {
				title: 'Session Timed Out',
			 },
		  },
		  ],
		  meta: {
			 title: 'Error',
		  },
	   },
	   {
		  path: '*',
		  redirect: '/error/404',
		  meta: {
			 title: 'Page Not Found',
		  },
	   },
    ],
};
