import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const LanguageSwitcher = ({onLanguageChange,locale}:{onLanguageChange:(newLocale:string)=>void,locale:string}) => {
  

  return (
    <>
      
        <DropdownMenu >
          <DropdownMenuTrigger   className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent text-[#DC0D15]">
            <span > {locale.toUpperCase()}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent    align="end">
            <DropdownMenuItem onClick={() => onLanguageChange('tr')} className="flex items-center gap-2">
              <span >TR</span>
              <span>Türkçe</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onLanguageChange('en')} className="flex items-center gap-2">
              <span >EN</span>
              <span>English</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
      
    </>
  );
};

export default LanguageSwitcher;
