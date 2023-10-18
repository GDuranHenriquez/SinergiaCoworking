interface DataMayus {
  icon: JSX.Element;
  description: string;
}

function IconDescription({ data }: { data?: DataMayus }) {
  if (!data) {
    return null;
  }
  return (
    <div>
      <div>{data.icon }{data.description}</div>
      
    </div>
  );
}
export default IconDescription;
