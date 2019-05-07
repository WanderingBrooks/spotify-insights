const React = require('react');

import { Table as Tabler } from "tabler-react";

const Table = ( props ) => {
  return (
    <Tabler>
      <Tabler.Header>
        <Tabler.ColHeader key='tracks'>
          <span>Tracks</span>
        </Tabler.ColHeader>
      </Tabler.Header>
      <Tabler.Body>
        {
          props.tracks.map( ( track ) => {
            return (
              <Tabler.Row key={ track.id }>
                <Tabler.Col key='name'>
                  <span>{ track.name }</span>
                </Tabler.Col>                
              </Tabler.Row>
            );
          })
        }
      </Tabler.Body>
    </Tabler>
  );
};

module.exports = Table;

