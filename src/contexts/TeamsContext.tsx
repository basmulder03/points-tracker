import {createContext, useState} from "react";
import Team from "../entities/Team.ts";

const TeamsContext = createContext<Team[]>([]);

const TeamsContextProvider = (props: React.PropsWithChildren) => {
    const [teams, setTeams] = useState<Team[]>([]);


}