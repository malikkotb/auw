import { useState } from 'react';

export default function OpacityHoverList({ projects }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className='margin-top flex flex-col w-full border-t border-black'>
      {projects.map((project) => (
        <div
          key={project.id}
          onMouseEnter={() => setHoveredId(project.id)}
          onMouseLeave={() => setHoveredId(null)}
          className='flex h1 cursor-pointer w-full justify-between border-b pt-2 pb-1 border-black'
          style={{
            backgroundColor: hoveredId === project.id ? 'black' : 'transparent',
            transition: hoveredId === project.id ? 'none' : 'background-color 0.5s ease-out'
          }}
        >
          <div 
            className='uppercase'
            style={{
              color: hoveredId === project.id ? 'white' : 'black',
              transition: 'none'
            }}
          >{project.title}</div>
          <div 
            className='uppercase'
            style={{
              color: hoveredId === project.id ? 'white' : 'black',
              transition: 'none'
            }}
          >{project.description}</div>
          <div 
            className='uppercase'
            style={{
              color: hoveredId === project.id ? 'white' : 'black',
              transition: 'none'
            }}
          >({project.year})</div>
        </div>
      ))}
    </div>
  );
}
