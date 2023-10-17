
import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {useDroppable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';

export function Draggable(props) {
  var {attributes, listeners, transform, setNodeRef} = useDraggable({
    id: props.id,
  });

  var {isOver} = useDroppable({
    id: props.id,
  });

  console.log('props', props)

  var style = {
    transform: CSS.Translate.toString(transform),
    color: isOver ? 'blue' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
      {console.log('child2', props.children)}
    </div>
  );


}
