import MailList from "@/components/MailList/MailList";
import MailPicker from "@/components/MailPicker/MailPicker";

export default function Home() {
  return (
    <>
      <div className="container p-4">
        {/*<MailPicker />*/}
        <MailList />
      </div>
    </>
  );
}
