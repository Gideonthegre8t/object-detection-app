import "../../app/styles.css";
import LogoSection from "../logo/LogoSection";
import TimerSection from "../timer/TimerSection";
import SystemCheck from "../system/SystemCheck";
import Copyright from "../copyright/Copyright";

function Detection() {
  return (
    <section className="pb-20">
      <div className="detection-top bg-customWhite">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between pb-2">
          <LogoSection />
          <TimerSection />
        </div>
      </div>
      <SystemCheck />
      <Copyright />
    </section>
  );
}

export default Detection;
