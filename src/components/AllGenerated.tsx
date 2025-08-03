import React, { useEffect, useState } from 'react';

const AllGenerated: React.FC = () => {
  const [components, setComponents] = useState<any[]>([]);
  const [usernames, setUsernames] = useState<{ [key: string]: string }>({});
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch('https://ui-ai.onrender.com/components/?skip=0&limit=100');
        const data = await response.json();
        setComponents(data);

        // Fetch usernames for each user ID
        const userIds: string[] = data.map((component: any) => component.user_id);
        const uniqueUserIds: string[] = [...new Set(userIds)];
        const usernamesData: { [key: string]: string } = {};

        await Promise.all(
          uniqueUserIds.map(async (userId: string) => {
            const userResponse = await fetch(`https://ui-ai.onrender.com/users/${userId}`);
            const userData = await userResponse.json();
            console.log(userData);
            usernamesData[userId] = userData.name;
          })
        );
        console.log(usernamesData);
        setUsernames(usernamesData);
      } catch (error) {
        console.error('Error fetching components or users:', error);
      }
    };

    fetchComponents();
  }, []);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-8 bg-gray-100 h-fit">
      <h1 className="text-3xl font-bold mb-6">Components</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component) => (
          <div key={component.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">Component {component.id}</h2>
            <p className={`text-gray-600 mb-4 ${expanded[component.id] ? '' : 'line-clamp-2'}`}>
              {component.description}
            </p>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => toggleExpand(component.id)}
            >
              {expanded[component.id] ? 'Read less' : 'Read more'}
            </button>
            <p className="text-gray-600 mb-4">Created by: {usernames[component.user_id]}</p>
            <div dangerouslySetInnerHTML={{ __html: component.html }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGenerated;