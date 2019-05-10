const React = require('react');
const RRD   = require('react-router-dom');

import { Table as Tabler } from 'tabler-react';

const Table = ( props ) => {
  return (
    <Tabler style={ props.style }>
      <Tabler.Header>
        {
          props.headers.map( ( header ) => {
            return (
              <Tabler.ColHeader key={ `${ props.id }-${ header }` }>
                <span>{ header }</span>
              </Tabler.ColHeader>
              );
          })
        }
      </Tabler.Header>
      <Tabler.Body>
        {
          props.rows.map( ( row, rIndex ) => {
            return (
              <Tabler.Row key={ `${ props.id }-${ rIndex }` }>
                {
                  row.map( ( column, cIndex ) => {
                    return (
                      <Tabler.Col key={ `${ props.id }-${ rIndex }-${ cIndex }` }>
                        {
                          column.path
                            ? <RRD.Link to={ column.path }>{ column.value }</RRD.Link>
                            : <span>{ column }</span>
                        }
                      </Tabler.Col>
                    );
                  })
                }              
              </Tabler.Row>
            )
          })
        }
      </Tabler.Body>
    </Tabler>
  );
};

module.exports = Table;

