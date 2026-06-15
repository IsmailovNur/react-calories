import { type FC } from 'react';
import { Spin } from 'antd';
import "./Loader.css";

interface LoaderProps {
  isLoading: boolean;
}

const Loader: FC<LoaderProps> = ({isLoading}) => {
  if (!isLoading) return null;
  return (
    <div className="loader">
      <Spin size="large" />
    </div>
  );
};

export default Loader;