import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="text-2xl font-bold text-red-600">
      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
        <img
          className="w-full h-full object-cover"
          src="https://scontent.fuln4-2.fna.fbcdn.net/v/t39.30808-6/557457428_122106458367049316_7884193393419168958_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=z6GYK3AONkAQ7kNvwGYhraA&_nc_oc=AdnIE22fw00X4QuhXRm7OXDD3CH1jaAc7f7atzmHEBXqOHSoVDyIHi59ROCS589eSTI&_nc_zt=23&_nc_ht=scontent.fuln4-2.fna&_nc_gid=HpSG1tRvYXRxmGKgR8OCvw&oh=00_AfmPn-oPu99rxfgxFSlUJ6y92vLuC2mkdITeKuyU4WtZ9Q&oe=69584F13"
          alt="Logo"
        />
      </div>
    </Link>
  );
}
