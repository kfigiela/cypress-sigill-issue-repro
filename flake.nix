{
  inputs = {
    # You can override nixpkgs to use the latest set of node packages
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
  };

  outputs = {
    systems,
    nixpkgs,
    ...
  } @ inputs: let
    eachSystem = f:
      nixpkgs.lib.genAttrs (import systems) (
        system:
          f nixpkgs.legacyPackages.${system}
      );
  in {
    devShells = eachSystem (pkgs: {
      default = pkgs.mkShell {
        buildInputs = with pkgs; [
          nodejs
          # cypress # only on linux :(
          # You can choose pnpm, yarn, or none (npm).
          nodePackages.pnpm
          gitAndTools.pre-commit
        ];
        shellHook = ''
            cd ''${CI_PROJECT_DIR:=$PWD}
            if ! [[ -f .git/hooks/pre-commit ]]; then
              ${pkgs.gitAndTools.pre-commit}/bin/pre-commit install
              if [[ -f .envrc ]]; then
                cat .git/hooks/pre-commit | grep --silent "direnv export bash" || sed --in-place '2 s/^/eval "$(direnv export bash)" /' .git/hooks/pre-commit
              fi
            fi
          '';
      };
    });
  };
}
