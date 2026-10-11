import type { IconType } from "react-icons";
import { LuFacebook, LuInstagram, LuLinkedin } from "react-icons/lu";
import type { SocialId } from "@/data/site";

/** Icono del estudio para cada red de `SOCIAL_LINKS`. */
export const SOCIAL_ICONS: Record<SocialId, IconType> = {
  instagram: LuInstagram,
  facebook: LuFacebook,
  linkedin: LuLinkedin,
};
