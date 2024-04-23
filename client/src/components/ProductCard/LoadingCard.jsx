import { Skeleton, Card } from "antd";

export default function LoadingCard({ count }) {
  const LoopCard = () => {
    let cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(
        <Card className="col-md-4">
          <Skeleton active />
        </Card>
      );
    }
    return cards
  };
  return (
    <>
      <div className="row">{LoopCard()}</div>
    </>
  );
}
