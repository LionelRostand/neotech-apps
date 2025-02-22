
import Calendar from '@/pages/Calendar';
import Events from '@/pages/calendar/Events';
import Meetings from '@/pages/calendar/Meetings';
import Chat from '@/pages/calendar/Chat';
import Notifications from '@/pages/calendar/Notifications';

export const calendarRoutes = {
  path: "calendar",
  element: <Calendar />,
  children: [
    {
      index: true,
      element: <Events />
    },
    {
      path: "events",
      element: <Events />
    },
    {
      path: "meetings",
      element: <Meetings />
    },
    {
      path: "chat",
      element: <Chat />
    },
    {
      path: "notifications",
      element: <Notifications />
    }
  ]
};
