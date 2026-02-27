import { AppointmentForm } from "@/components/forms/Appointment";
import { getPatient } from "@/lib/actions/patient.action";
import Image from "next/image";
import * as Sentry from "@sentry/nextjs";

export default async function NewAppointment({params}: SearchParamProps) {
  const { userId } = await params;
  const patient = await getPatient(userId)

  Sentry.metrics.count('user_view_new-appointment', 1, { attributes: { username: patient.name } });

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
          className="mb-12 h-10 w-fit"
          />
        </div>
        <AppointmentForm 
          type="create"
          userId={userId}
          patientId={patient?.$id}
        />
          <p className="copyright mt-10 py-12">© 2026 CarePulse</p>
      </section>
      <Image
      src="/assets/images/appointment-img.png"
      height={1000}
      width={1000}
      alt="appointment"
      className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}