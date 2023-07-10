import { GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";

type Category = {
  count: number;
  image: string;
  titleImage: string;
};

type Profile = {
  image: string;
  name: string;
  collectibles: number;
  totalValue: string;
  pokemonGoTrainerCode: string;
  mtgArenaName: string;
  itemsSold: number;
  itemsBought: number;
  itemsTraded: number;
  categories: {
    pokemon: Category;
    magicTheGathering: Category;
    funkoPop: Category;
    fleshAndBlood: Category;
    marvelComics: Category;
    yugioh: Category;
    digimon: Category;
    nft: Category;
    videogames: Category;
  };
};

interface ProfileProps {
  profile: Profile | null;
}

export default function ProfilePage({ profile }: ProfileProps) {
  if (!profile) {
    return <p>Profile not found</p>;
  }

  return (
    <div>
      <img src={profile.image} alt={profile.name} />
      <h1>{profile.name}</h1>
      {/* Render the rest of your profile data... */}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (
  context
) => {
  const {
    params: { name },
  } = context;

  try {
    const res = await axios.get<Profile>(
      `http://localhost:3003/api/profile/${name}`
    );
    const profile = res.data;

    return {
      props: {
        profile,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        profile: null,
      },
    };
  }
};
