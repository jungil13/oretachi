import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { FOOTER_LINKS } from "@/lib/navigation";
import { CONTACT_INFO } from "@/lib/data/seed";
import { InstagramIcon, FacebookIcon } from "@/components/ui/social-icons";

const SOCIAL_LINKS = [
    {
        href: "https://instagram.com/oretachinocurry",
        label: "Instagram",
        icon: InstagramIcon,
    },
    {
        href: CONTACT_INFO.fbPage || "https://www.facebook.com/OretachinoCurryPhilippines",
        label: "Facebook",
        icon: FacebookIcon,
    },
];

export function Footer() {
    return (
        <footer className="border-t border-border bg-deep-black text-pure-white">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Logo variant="inverted" showTagline />
                        <p className="mt-4 max-w-xs text-sm text-pure-white/60 leading-relaxed">
                            Loved in Osaka, coming to Cebu. Authentic Japanese curry crafted
                            with traditional recipes and premium ingredients.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold tracking-wide text-curry-yellow uppercase">
                            Explore
                        </h4>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-pure-white/60 sm:grid-cols-1">
                            {FOOTER_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="transition-colors hover:text-curry-yellow"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold tracking-wide text-curry-yellow uppercase">
                            Contact
                        </h4>
                        <ul className="space-y-3 text-sm text-pure-white/60">
                            <li className="flex items-start gap-2.5">
                                <MapPin size={16} className="mt-0.5 shrink-0 text-curry-yellow" />
                                <span>{CONTACT_INFO.address}</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone size={16} className="shrink-0 text-curry-yellow" />
                                <a
                                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                                    className="transition-colors hover:text-curry-yellow"
                                >
                                    {CONTACT_INFO.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Mail size={16} className="shrink-0 text-curry-yellow" />
                                <a
                                    href={`mailto:${CONTACT_INFO.email}`}
                                    className="transition-colors hover:text-curry-yellow"
                                >
                                    {CONTACT_INFO.email}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold tracking-wide text-curry-yellow uppercase">
                            Follow Us
                        </h4>
                        <p className="mb-4 text-sm text-pure-white/60">
                            Stay updated on new dishes, events, and opening news.
                        </p>
                        <div className="flex gap-3">
                            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-pure-white/20 transition-colors hover:border-curry-yellow hover:bg-curry-yellow/10 hover:text-curry-yellow"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-pure-white/10 pt-8 text-center text-sm text-pure-white/40 sm:flex-row sm:text-left">
                    <p>&copy; {new Date().getFullYear()} Oretachi no Curry-ya. All rights reserved.</p>
                    <p className="text-pure-white/30">Cebu City, Philippines</p>
                </div>
            </div>
        </footer>
    );
}
