import { JsonView, defaultStyles } from 'react-json-view-lite';

import 'react-json-view-lite/dist/index.css';

export const Field = ({ value }: { value: JSON }) => (
  <div style={{ maxHeight: '280px', overflowY: 'auto', border: '1px solid #e2e8f0' }}>
    <JsonView
      data={value}
      style={{
        ...defaultStyles
      }}
    />
  </div>
);

export const Cell = () => null;
export const CardValue = Field;
