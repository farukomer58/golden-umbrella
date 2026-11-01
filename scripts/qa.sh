#!/usr/bin/env bash
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1

no_e2e=false
if [[ $# -gt 1 || (${1:-} != "" && ${1:-} != "--no-e2e") ]]; then
  echo "Usage: bash scripts/qa.sh [--no-e2e]" >&2
  exit 2
fi
[[ ${1:-} == "--no-e2e" ]] && no_e2e=true

mkdir -p qa-results || exit 1
failed=0
summary=()
run_section() {
  local name="$1"
  shift
  local status=PASS
  printf '\n=== %s ===\n' "$name"
  if ! "$@" 2>&1 | tee "qa-results/$name.log"; then
    status=FAIL
    failed=1
  fi
  printf '%s: %s\n' "$name" "$status"
  summary+=("$name: $status")
}

run_section lint npm run lint
run_section typecheck npm run typecheck
run_section build npm run build
run_section vitest npm test
if $no_e2e; then
  echo "playwright: SKIP"
  summary+=("playwright: SKIP")
else
  run_section playwright npm run test:e2e
fi

printf '\nSummary\n'
printf '%s\n' "${summary[@]}"
if [[ $failed -eq 0 ]]; then
  echo "result: PASS"
else
  echo "result: FAIL"
fi
exit "$failed"
