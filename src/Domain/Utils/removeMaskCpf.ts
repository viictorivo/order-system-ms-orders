export function removeMaskCpf(ObjCPF: string) {
  return ObjCPF.replace(/\D/g, '');
}
